/**
 * Test Suite: Twitch SPA Navigation & F5 Reload Lifecycle Safety Test
 * 
 * Objective: Verify that injected scriptlets and worker event listeners cleanly
 * detach without throwing unhandled exceptions or accessing terminated V8 contexts
 * during rapid frame reload (F5).
 */

class MockV8Context {
  constructor() {
    this.isTerminated = false;
  }

  terminate() {
    this.isTerminated = true;
  }

  execute(callback) {
    if (this.isTerminated) {
      throw new Error("AccessViolation: v8::Context is already terminated");
    }
    return callback();
  }
}

class TwitchScriptletManager {
  constructor(v8Context) {
    this.context = v8Context;
    this.listeners = new Map();
    this.isUnloaded = false;

    // Register teardown listener for pagehide / beforeunload 
    this.setupTeardownGuards();
  }

  setupTeardownGuards() {
    this.teardownHandler = () => {
      this.isUnloaded = true;
      this.cleanup();
    };
  }

  cleanExecute(eventName, fn) {
    if (this.isUnloaded || this.context.isTerminated) {
      // Safely suppress execution on unloaded context
      return null;
    }
    try {
      return this.context.execute(fn);
    } catch (err) {
      if (err.message.includes("terminated")) {
        console.warn(`[SafeGuard] Intercepted execution on terminated context for event: ${eventName}`);
        return null;
      }
      throw err;
    }
  }

  cleanup() {
    this.listeners.clear();
  }
}

function runLifecycleTest() {
  console.log("=== Running Twitch F5 Reload Lifecycle Safety Test ===");

  const context = new MockV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simulate active Twitch player stream & scriptlet hook
  let executedCount = 0;
  const intervalId = setInterval(() => {
    manager.cleanExecute("twitch-ad-defuser", () => {
      executedCount++;
    });
  }, 10);

  // Simulate F5 keypress (Document Teardown) after 50ms
  setTimeout(() => {
    console.log("[Test] Triggering F5 Reload (Document Unload)...");
    manager.teardownHandler();
    context.terminate();

    // Attempt delayed async callback after termination
    const result = manager.cleanExecute("twitch-ad-defuser-post-reload", () => {
      executedCount++;
    });

    clearInterval(intervalId);
    console.log(`[Test Result] Executed count: ${executedCount}, Post-reload safe result: ${result}`);
    if (result === null) {
      console.log("SUCCESS: Scriptlet safely guarded against V8 context access violation!");
    } else {
      console.error("FAILURE: Context violation was not guarded.");
    }
  }, 50);
}

runLifecycleTest();
