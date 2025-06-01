// Custom configuration script for debloated Brave
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue('🔥 Applying Custom Brave Configuration...'));

// Custom build flags based on official Brave structure
const customFlags = {
  // Disable bloatware features
  'brave_rewards_enabled': false,
  'brave_wallet_enabled': false,
  'brave_vpn_enabled': false,
  'brave_leo_enabled': false,
  'brave_news_enabled': false,
  'brave_sync_enabled': false,
  'brave_ads_enabled': false,
  'enable_tor': false,
  
  // Keep essential features
  'brave_shields_enabled': true,
  'enable_extensions': true,
  'enable_webstore_installer': true,
  
  // Custom branding
  'brave_product_name': '"MyCustomBrave"',
  'brave_project_name': '"MyCustomBrave"',
  
  // Performance optimizations
  'is_debug': false,
  'symbol_level': 0,
  'enable_nacl': false
};

// Apply configuration to build files
function applyCustomConfig() {
  const configPaths = [
    'src/brave/build/config.gni',
    'src/out/Release/args.gn',
    'src/out/android_arm64/args.gn'
  ];
  
  configPaths.forEach(configPath => {
    if (fs.existsSync(configPath)) {
      console.log(chalk.green(`✅ Applying config to ${configPath}`));
      
      let configContent = fs.readFileSync(configPath, 'utf8');
      
      // Add custom flags
      Object.entries(customFlags).forEach(([key, value]) => {
        const flagLine = `${key} = ${value}`;
        if (!configContent.includes(key)) {
          configContent += `\n# Custom configuration\n${flagLine}\n`;
        }
      });
      
      fs.writeFileSync(configPath, configContent);
    }
  });
  
  console.log(chalk.blue('🚀 Custom configuration applied successfully!'));
}

// Create custom args.gn template
function createCustomArgsTemplate() {
  const argsContent = Object.entries(customFlags)
    .map(([key, value]) => `${key} = ${value}`)
    .join('\n');
    
  const template = `# Custom Brave Build Configuration
# Generated automatically for MyCustomBrave

${argsContent}

# Additional custom settings
target_cpu = "x64"
is_component_build = false
proprietary_codecs = true
`;

  fs.writeFileSync('custom_args.gn', template);
  console.log(chalk.green('✅ Custom args.gn template created'));
}

// Main execution
if (require.main === module) {
  applyCustomConfig();
  createCustomArgsTemplate();
}

module.exports = { customFlags, applyCustomConfig };
