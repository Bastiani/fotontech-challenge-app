#!/usr/bin/env bash

# packager
adb reverse tcp:8081 tcp:8081
adb -d reverse tcp:8081 tcp:8081
adb -e reverse tcp:8081 tcp:8081

# Storybooks
adb reverse tcp:7007 tcp:7007
adb -d reverse tcp:7007 tcp:7007
adb -e reverse tcp:7007 tcp:7007

# GraphQL
adb reverse tcp:5000 tcp:5000
adb -d reverse tcp:5000 tcp:5000
adb -e reverse tcp:5000 tcp:5000

# Relay Dev Tools
adb reverse tcp:8097 tcp:8097
adb reverse tcp:8734 tcp:8734
