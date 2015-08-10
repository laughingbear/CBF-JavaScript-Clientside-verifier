# CBF-JavaScript-Clientside-verifier
A JavaScript implementation of the bet validation script 

This is a javascript port of the Cryptobetfair PHP verifier. (https://cryptobetfair.com/d/i/verifybet.php?showyourself=pygmentize)
It relies heavily on CryptoJS and PHPJS. 
The usage of PHPJS, is done to maintain readability and comparability with the PHP verifier.

#Requirements

* http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js
* http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha256.js
* http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js
* https://raw.githubusercontent.com/kvz/phpjs/master/functions/misc/pack.js
* https://raw.githubusercontent.com/kvz/phpjs/master/workbench/misc/unpack.js
* https://raw.githubusercontent.com/kvz/phpjs/master/functions/bc/bccomp.js
* https://raw.githubusercontent.com/kvz/phpjs/master/functions/strings/bin2hex.js
* https://raw.githubusercontent.com/kvz/phpjs/master/functions/strings/str_split.js
* https://raw.githubusercontent.com/kvz/phpjs/master/functions/math/hexdec.js

#Usage:

If you are on Chrome install tempermonkey. on firefox install greasemonkey. 

Create a new userscript and paste the contents of userscript.js, press save. and you are done.

#verif.js 
Verif.js is a JS file for external usage, containing only the verifier function based on the betdata.


