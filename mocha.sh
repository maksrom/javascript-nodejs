#!/bin/bash
NODE_ENV=test NODE_PATH=. mocha --timeout 10000 --require should --require test/env $*

