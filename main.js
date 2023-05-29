const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
var template = require('./template.js');

const app = http.createServer((request, response) => {
    const _url = request.url;
    const queryData = new URL(_url, 'http://localhost:3000/').searchParams;
    const pathname = new URL(_url, 'http://localhost:3000/').pathname;
    if(pathname === '/'){
        if(queryData.get('id') == undefined){     
            fs.readdir('./data', (error, filelist) => {
                var list = template.List(filelist);
                var title = 'Pythonic Record';
                var description = `<div>
                    <ul style="list-style-type: none;">
                        <li><h2>학습 내용</h2></li>
                    </ul>
            <div class="description">
                <div style="display: box;">
                    <ol>
                        ${list}
                    </ol>
                </div>
                <div class="names">
                    조장:<br>
                    조원:<br>
                </div>
                <div class="names">
                    손기원<br>
                    김세진<br>
                    문태조<br>
                    박성완<br>
                    박영민<br>
                    김동휘<br>
                    안형준<br>
                    허지환
                </div>
                </div>
                </div>
                `;
                var templateHTML = template.HTML(title, description, '<a href="/create">작성</a>');
                
            response.writeHead(200);
            response.end(templateHTML);
            });
        } else {
            fs.readdir('./data', function(error, filelist){
                var filteredId = path.parse(queryData.get('id')).base;
                fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
                    var title = path.parse(queryData.get('id')).name;
                    var html = template.HTML(title, description, `<a href="http://localhost:3000">돌아가기</a>`);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }

    } else if(pathname === "/create"){
        var title  = "활동보고서";
        var html = template.HTML(title, `
            <form action="http://localhost:3000/create_process" method="POST">
                <div class="form-group">
                    <label for="date" style="margin-top: 5px;">날짜</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="period">차시</label>
                    <textarea type="text" id="period" name="period" required></textarea>
                </div>
                <div class="form-group">
                    <label for="activity6">활동내역(1)-6교시</label>
                    <textarea type="text" id="activity6" name="activity6" required></textarea>
                </div>

                <div class="form-group">
                    <label for="activity7">활동내역(2)-7교시</label>
                    </label>
                    <textarea type="text" id="activity7" name="activity7" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name1">김동휘 소감문</label>
                    <textarea type="text" id="name1" name="name1" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name2">김세진 소감문</label>
                    <textarea type="text" id="name2" name="name2" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name3">문태조 소감문</label>
                    <textarea type="text" id="name3" name="name3" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name4">박성완 소감문</label>
                    <textarea type="text" id="name4" name="name4" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name5">박영민 소감문</label>
                    <textarea type="text" id="name5" name="name5" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name6">손기원 소감문</label>
                    <textarea type="text" id="name6" name="name6" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name7">안형준 소감문</label>
                    <textarea type="text" id="name7" name="name7" required></textarea>
                </div>

                <div class="form-group">
                    <label for="name8">허지환 소감문</label>
                    <textarea type="text" id="name8" name="name8" required></textarea>
                </div>
                <div>
                    <input class="submit_button" type="submit">
                </div>
            </form>
        `, '')
        response.writeHead(200);
        response.end(html);
    } else if(pathname === '/create_process'){
        var body = "";
        request.on('data', (data) => {
            body += data;
        });
        request.on("end", () => {
            const post = qs.parse(body);
            const date = post.date;
            const period = post.period;
            const activity6 = post.activity6;
            const activity7 = post.activity7;
            const name1 = post.name1;
            const name2 = post.name2;
            const name3 = post.name3;
            const name4 = post.name4;
            const name5 = post.name5;
            const name6 = post.name6;
            const name7 = post.name7;
            const name8 = post.name8;
            const description = `<body>
    <h1>${period}</h1>
    <p>
        <h3>활동 내용</h3>
        <ol>
            <li>${activity6}</li>
            <li>${activity7}</li>
        </ol>
        <h3>소감</h3>
        <ol>
            <li>김동휘: ${name1}</li>
            <li>김세진: ${name2}</li>
            <li>문태조: ${name3}</li>
            <li>박성완: ${name4}</li>
            <li>박영민: ${name5}</li>
            <li>손기원: ${name6}</li>
            <li>안형준: ${name7}</li>
            <li>허지환: ${name8}</li>
        </ol>
    </p>
</body>
            `;
            fs.writeFile(`data/${date}`, description, 'utf8', (err) => {
                console.log(description);
                response.writeHead(302, {location: `/?id=${date}`});
                response.end();
            });
    
        })
    }else {
    response.writeHead(404);
    response.end('Not found');
    }

});

app.listen(3000);