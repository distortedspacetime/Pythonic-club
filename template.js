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
        }
        .logo {
            margin: auto;
            display: block;
            height: 100px;
        }
        .upper-bar{
            background: rgba(3, 3, 49, 0.795);
            padding: 0px auto;
        }
        .body {
            margin: 20px auto;
            width: 900px;
            background: white;
            color: black;
            padding: 20px;
            border-radius: 5px;
        }
        .control {
            margin: 20px;
            width: 100px;
            background: white;
            color: black;
            border-radius: 5px;
            text-align: center;
        }
    </style>
    <body>
        <div class="upper-bar">
            <img class="logo" height="100px" src="https://gcdaeseong-h.gne.go.kr/upload/gcdaeseong-h/clubhmpg_10004924/img_032d66cc-7b10-4896-b8e4-5a6fea10fc711680704204177.png">
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