#!/usr/bin/env bash

# call it from the project's root folder
curl --output es-en.xml https://raw.githubusercontent.com/mananoreboton/en-es-en-Dic/master/src/main/resources/dic/es-en.xml

echo "const spanish_nouns = " > spanish_nouns.js
cat es-en.xml | xq '.dic.l[0].w[] | select( (.t | startswith("{f}") ) or (.t | startswith("{m}")) ) | .c' | jq -s >> spanish_nouns.js
echo ";" >> spanish_nouns.js
