const axios = require('axios');
const ib = 'https://i.instagram.com/api/v1/direct_v2/inbox/';


const get_chat = async (username, session_id)=>{
    const usr_id = session_id.match(/\d+/)[0] || 0;
    const headers = {
        "sec-ch-ua":'"Chromium";v="116", "Not)A;Brand";v="24", "Opera GX";v="102"',
        "X-IG-WWW-Claim":"hmac.AR2Apin67N7MwoE3k7yzfBDnplkvkGU3XkSwyHzC5IgkHNMr",
        "sec-ch-ua-platform-version":"15.0.0",
        "X-Requested-With":"XMLHttpRequest",
        "dpr":"1.25",
        "sec-ch-ua-full-version-list":'"Chromium";v="116.0.5845.188", "Not)A;Brand";v="24.0.0.0", "Opera GX";v="102.0.4880.104"',
        "sec-ch-prefers-color-scheme":'dark',
        'X-CSRFToken':'8QKr8lbik2MZyc6LDsoVlovOE8LkhohE',
        'sec-ch-ua-platform':"Windows",
        'X-IG-App-ID':'936619743392459',
        'sec-ch-ua-model':"",
        'sec-ch-ua-mobile':'?0',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0',
        'viewport-width':'1495',
        'Accept':'*/*""',
        ' X-ASBD-ID':129477,
        'Sec-Fetch-Site':'same-origin',
        'Sec-Fetch-Mode':'cors',
        'Sec-Fetch-Dest':'empty',
        'host':'www.instagram.com',
        'Cookie':'ig_did=77FF94AA-96B7-495C-AEA3-766F59AA5099; datr=GeBqZQrTqdnoswyDT9t1KuEi; mid=ZWrgGQALAAHNuv7Jh1-lYOG6q6SS; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=48455698751; csrftoken=Z8SoH2xqwDVFf9WYK6pF2HHxvFa6TOb2; dpr=1.25; shbid="14068054484556987510541734143275:01f744ef5b749ff97655aca3311b84188c0d94f3435e1fc9a13f84260ef1fb9aa6050843"; shbts="1702607275054484556987510541734143275:01f7e4b408652274b75962dc476a6f05348aaaf2d698a5efd0bb6f5c59b9516e62c3ec84"; sessionid=' + session_id + '; fbsr_124024574287414=Pr9KpxzmL_OON6GWe6v7nGdZZ724pe6QPkCUJZrYJ68.eyJ1c2VyX2lkIjoiMTAwMDAzMzQzMDUzNTcxIiwiY29kZSI6IkFRQUZhZjJMMmFhT2EyYTZwaW1QYkVoY3NRYmViMkdEYXpkZ1dXTmtNNXEzV09FOV9VVHlrZnJDSy1zX18taWJIWnlDOW00eV9JWWZvc1IyWWpFQWtWMW5pQ1RQNnl4Nk5NY3d3LVVPbVBZRDBFQ2lxSzRCNUcwZ3JwMnJoTld6UHlEZGk3bHlnaVJMSjBVM0pfamwwUU0td0dJMDktN0xLeGN4T0pfS2wzeGpTbnVEenZwemc4QWVuX1lzVnpGMDdTeElfMDVselB4UVV6am5pNXFOblRlYVI3M19mSVh3cEdvZWlmTER1WmYtVXlKQWtBRjg2Zjh4ZUVndG5kSkx0OUdmVS1Hbng4cExlTjhQTnZsb3dneDhQbDF2d2g3MDRtSFdhWlRONjZFekh4dTdRM3d3TlMtUVNEUFNTcldGMmRhSFdPMmJienFPWUtMWUtlcHhaVVpaIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCT3dDdm55ZGlOcG5ZNU05VmtaQnhQRlNXMXBJd3htYTdrNXBaQXI2b0FFM1ZFU0IzdU5Ic1dzTU15MDU0a3U0cWhib2t4TTFsbGthTkptWVVIWkJWZHZOSkdkNjIwcUdETlBmWkFrbWhLMjlQUHdsOTRLWVd2MnZOdGpLU0lKMjRLcjFOUEdzYUlUUDNOc3luQlhwMjVwREFGMFpBZG5XSTVQMXNCczlCT3Y0SHRIWkJJNjM5NlpBVWhzbWRwc3ByOHMzek5JTDJaQTBaRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNzAyNjA3Mjg0fQ; rur="EAG054484556987510541734143285:01f72ac5c86194f91eb3b0b26f1542c52b61569279289a21897d74e92bd72421abee6447"',
    }
    await axios.get(ib,{
        'headers': headers
    }).then(async res=>{
        res.data.inbox.threads.forEach((row)=>{
            if (row.users[0].username==username && row.thread_id) {
                thread = row.thread_id;
            };
        })
        if (thread) {
            await axios.get(`https://i.instagram.com/api/v1/direct_v2/threads/${thread}/?limit=30`,{
                'headers': headers
            }).then((row)=>{
                row.data.thread.items.forEach(row=>{
                    if (row.text) {
                        if (row.user_id == usr_id) {
                            console.log("You : " + row.text);
                        } else {
                            console.log(username + " : " + row.text)
                        }
                    }
                })
            })
        }
    })
}


module.exports = get_chat