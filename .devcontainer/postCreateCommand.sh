#!/bin/bash
git clone -q --no-tags --single-branch git@github.com:awslabs/git-secrets.git ~/.git-secrets
sudo make -C ~/.git-secrets install

