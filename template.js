module.exports = {
    HTML:((title, body, control) => `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <style>
        body {
            margin: 0%;
            background: #303030;
            color: white;
            font-family: "Noto Sans KR", sans-serif;
        }
        @font-face {
            font-family: "Noto Sans KR";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/notosanskr/v13/PbykFmXiEBPT4ITbgNA5Cgm203Tq4JJWq209pU0DPdWuqxJFA4GNDCBYtw.0.woff2)
                format("woff2");
        }
        body {
            margin: 0%;
            background: #303030;
            color: white;
            font-family: "Noto Sans KR", sans-serif;
        }
        label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }    
        .logo {
            display: block;
            margin: auto;
        }
        .logo img{
            max-width: 42.5%;
        }
        .upper-bar{
            background: rgba(0,0,0,0);
            padding: 10px;
            text-align: center;
        }
        .body {
            margin: 0.5% auto;
            width: 70%;
            background: white;
            color: black;
            padding: 1%;
            border-radius: 20px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .control {
            margin-left: 14%;
            margin-bottom: 20px;
            width: 100px;
            background: white;
            color: black;
            border-radius: 5px;
            text-align: center;
        }
        .form-group {
            margin-bottom: 10px;
        }
        textarea,
        input[type="date"] {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .right-align {
            text-align: right;
        }
        .submit_button {
            margin-bottom: 10px;
        }
    </style>
    <body>
        <div class="upper-bar">
            <div  class="logo">
                <img src="https://gcdaeseong-h.gne.go.kr/upload/gcdaeseong-h/clubhmpg_10004924/img_032d66cc-7b10-4896-b8e4-5a6fea10fc711680704204177.png" alt="Pythonic Record">
            </div>
        </div>
        <div class="body">
            ${body}
        </div>
        <div class="control">
            ${control}
        </div>

    </body>
    </html>
    `
    ),

    List:((filelist) => {
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list+'</ul>';
        return list;
    })
}