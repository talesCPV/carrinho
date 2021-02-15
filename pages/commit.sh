#!/bin/bash
# Upload files to Github - https://github.com/talesCPV/PJ21.git

now=$(date)

cd ..

git init

git add pages/

git remote add origin "https://github.com/talesCPV/PJ21.git"

git commit -m "by_script -> ${now}"

git push -f origin master


