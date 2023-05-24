const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
var template = require('./lib/template.js');

const app = http.createServer((request, response) => {
    const _url = request.url;
    const queryData = new URL(_url, 'http://localhost:3000/').searchParams;
    const pathname = new URL(_url, 'http://localhost:3000/').pathname;
    if(pathname === '/'){
        if(queryData.get('id') == undefined){     
            fs.readdir('./data', (error, filelist) => {
                var list = template.List(filelist);
                var title = 'Pythonic Record';
                var description = `
                <p>
                    <ul>
                        <li><h2>학습 내용</h2></li>
                    </ul>
                    <h3>
                        <ol>
                            ${list}
                        </ol>
                    </h3>
                </p>
                <p>
                    <ul>
                        <li>조장: 1311 손기원</li>
                        <li>조원: 1102 김동휘<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1108 문태조<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1131 안형준<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1403 김세진<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1508 박성완<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1524 허지환<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1606 박영민
                        </li>
                    </ul>
                </p>`;
                var templateHTML = template.HTML(title, description, '');
                
            response.writeHead(200);
            response.end(templateHTML);
            });
        } else {
            fs.readdir('./data', function(error, filelist){
                var filteredId = path.parse(queryData.get('id')).base;
                fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
                    var title = path.parse(queryData.get('id')).name;
                    var html = template.HTML(title, description, `<input type="button" value="돌아가기" onclick="location.href='http://localhost:3000';">`);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }

    } else {
    response.writeHead(404);
    response.end('Not found');
    }

});

app.listen(3000);