var dseeds = [];
//Verify function only.
$.get("https://cryptobetfair.com/seeds.txt", function (data) {
    dseeds = data.split("\n");
    dseeds.shift();
});

function checkbetbyid(betid) {
    $.get("https://cryptobetfair.com/d/i/showbet.php?id=" + betid, function (data) {
        if (data.bet != null) {
            var b = data.bet;
            var result = checkbet(b);
            console.log(result);
        }
    });
}



// the checkbet function takes the same array as the php version.
function checkbet(b) {
    var betid = b['id'];
    var betctr = b['betctr'];
    var cseed = pack('H*', b['cseed']);
    var fseed = pack('H*', b['fseed']);
    var sseed = pack('H*', b['sseed']);
    var shash = pack('H*', b['shash']);

    if (b['dseed'] == null) {
        dseed == null
    } else {
        var dseed = pack('H*', b['dseed'])
    }
    ;
    var dhash = pack('H*', b['dhash']);
    var user = b['user'];
    var game = b['game'].toLowerCase();
    var result = b['multiplier'];
    var tocheckres = b['multiplier'] * 100;
    tocheckres = Math.floor(tocheckres) / 100;
    var multiply = b['multiplier'];
    var param = b['param'];

    var checks = [];
    var my_dhash = null;
    var resulttocheck = multiply;
    checks['betid'] = betid;

//===================================================================================
// Verification happens here:
    checks['hashchain integrity'] = null;
    for (i = 0; i < dseeds.length; i++) {
        var line = dseeds[i];
        var fields = line.split("\t");

        if (typeof fdhash !== 'undefined') {
            var f_dseed = fdhash;
        }
        var fdhash = pack('H*', fields[1]);
        if (typeof f_dseed !== 'undefined') {
            if (checks['hashchain integrity'] == null) {
                checks['hashchain integrity'] = 'pass';
            }
            if (fields[1].toString() != CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(f_dseed)).toString()) {
                checks['hashchain integrity'] = 'fail';

            } else {
            }
        }

        if (parseInt(fields[2].trim()) < betid && my_dhash == null) {
            my_dhash = fdhash;
            if (typeof f_dseed !== 'undefined') {
                my_dseed = f_dseed;
            }
        }
    }
    checks['this dhash = published dhash'] = dhash == my_dhash ? 'pass' : 'fail';
    endresult.dhash = checks['this dhash = published dhash'];



    if (dseed == null) {
        checks['sseed = hmac_sha256(username:betctr, dseed)'] = 'no data provided';
        checks['dhash = sha256(dseed)'] = 'no data provided';
    } else {
        var hash1 = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(dseed));
        hash1 = hash1.toString(CryptoJS.enc.Latin1);
        if (dhash == hash1) {
            checks['dhash = sha256(dseed)'] = 'pass';
        } else {
            checks['dhash = sha256(dseed)'] = 'fail';
        }
        var hmac = CryptoJS.HmacSHA256(user + ':' + betctr, CryptoJS.enc.Latin1.parse(dseed));
        hmac = hmac.toString(CryptoJS.enc.Latin1);
        checks['sseed = hmac_sha256(user:betctr,dseed)'] = sseed == hmac ? 'pass' : 'fail';
    }
    var hash2 = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(sseed));
    hash2 = hash2.toString(CryptoJS.enc.Latin1);
    checks['shash = sha256(sseed)'] = shash == hash2 ? 'pass' : 'fail';
    var hmac2 = CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(cseed), CryptoJS.enc.Latin1.parse(sseed));
    hmac2 = hmac2.toString(CryptoJS.enc.Latin1);
    console.log("####" + checks['sseed = hmac_sha256(user:betctr,dseed)'])
    checks['fseed = hmac_sha256(cseed, sseed)'] = fseed == hmac2 ? 'pass' : 'fail';

    switch (game) {


        case 'spin':
            checks['correct result'] == 'fail';
            var resultsspin = ['1.25', '0.25', '1.25', '0',
                '2', '0.35', '2', '0.4',
                '1.25', '0.25', '1.25', '0',
                '3', '0', '1.5', '0.25'];
            var seg = unpack('C*', fseed);
            seg = seg[1] >> 4 & 0x0F;
            var res1 = (resultsspin[seg]) * 100;
            var res2 = tocheckres * 100;
            if (parseInt(res1) == parseInt(res2)) {
                checks['correct result'] = 'pass';
            } else {
                checks['correct result'] = 'fail';
            }
            break;

        case 'drop':
            var dropresult;
            if (betid > 3393416) {
                var results = ['1', '0.3', '1.5', '0', '3', '0', '1.5', '0.3', '1'];
            } else {
                var results = ['1', '0.4', '1.5', '0', '3', '0', '1.5', '0.4', '1'];
            }
            var slot = param.split("=");
            var mystring = CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(slot[1]), CryptoJS.enc.Latin1.parse(fseed));
            var mystring = mystring.toString(CryptoJS.enc.Latin1);
            var segs2 = unpack('C*', mystring);
            var seg;
            checks['correct result'] == 'fail';
            for (i = 1; i < 64; i++) {
                seg2 = segs2[i];
                var seg = (seg2 >> 4) & 0x0F;
                if (seg < 9) {
                    if (parseInt(tocheckres) == parseInt(results[seg])) {
                        checks['correct result'] = 'pass';
                        dropresult = results[seg];
                    }
                    break;
                }
                seg = seg2 & 0x0F;
                if (seg < 9) {
                    if (parseInt(tocheckres) == parseInt(results[seg])) {
                        checks['correct result'] = 'pass';
                        dropresult = results[seg];
                    }
                    break;
                }
                seg = 4;
                if (parseInt(tocheckres) == parseInt(results[seg])) {
                    checks['correct result'] = 'pass';
                    dropresult = results[seg];
                }
            }
            break;

        case 'dice':
            var edge = "0.01";
            var hi = param.substring(0, 1) == '>' ? true : false;
            var target = param.substring(1) * 10000;
            var target = parseInt(target);
            var res = hi ? 1000000 : 0;
            var resarr = str_split(bin2hex(fseed), 5);
            for (var x = 0; x < resarr.length; x++) {
                var s = resarr[x];

                if (s.length == 5) {
                    var d = hexdec(s);
                    if (d < 1000000) {
                        var res = d;
                        break;
                    }
                }
            }

            if (betid > 192992 && betid < 4544134) {
                edge = "0.015";
                console.log("Old edge");
            }

            if ((hi && res > target) || (!hi && res < target)) {
                var t_target = hi ? 1000000 - target : target;
		var part1 = ((1000000 * 10e12) / (t_target * 10e12))/1e12;
                var part2 = 1 - edge;
                var win = ((part1 * 1e12) * (part2 * 1e12))/1e12;
                var win = Math.round(win * 100000000) / 100000000;
            } else {
                var win = "0.00000000";
                // var win = "0";
            }
            console.log(win + "==" + result);
            if (win == result) {
                checks['correct result'] = 'pass';
            } else {
                checks['correct result'] = 'fail';
            }
            break;
    }
    return checks;
}
