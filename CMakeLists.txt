cmake_minimum_required(VERSION 3.14)
project(ibrowe)

set(CMAKE_CXX_STANDARD 17)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/third_party/protobuf/src)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/third_party/googletest/src/googletest/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/third_party/googletest/src/googlemock/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/third_party/abseil-cpp)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/out/Debug_arm64/gen)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/out/Debug_arm64/gen/third_party/blink/public)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/base/allocator/partition_allocator/src)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/out/Debug_arm64/gen/base/allocator/partition_allocator/src)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/src/third_party/tflite_support/src/tensorflow_lite_support)
# The following file used is irrelevant, it's only to improve CLion
# performance. Leaving at least 1 file is required in order for CLion
# to provide code completion, navigation, etc.
add_executable(ibrowe src/components/omnibox/browser/document_provider.cc)