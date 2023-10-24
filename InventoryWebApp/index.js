const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000 || 0;

const server = http.createServer((req, res) => {
  const url = req.url;

  // Serve static files from the 'public' directory
  if (url.startsWith('/public/')) {
    const filePath = path.join(__dirname, url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('File not found');
      } else {
        // Determine the content type based on the file extension
        const extname = path.extname(filePath);
        let contentType = 'text/plain';
        if (extname === '.html') {
          contentType = 'text/html';
        } else if (extname === '.css') {
          contentType = 'text/css';
        } else if (extname === '.js') {
          contentType = 'text/javascript';
        } else if (extname === '.jpg' || extname === '.jpeg') {
          contentType = 'image/jpeg';
        } else if (extname === '.png') {
          contentType = 'image/png';
        }

        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  } else if (url === '/') {
    renderView('login', res);
  } else if (url === '/shoppingcart') {
    renderView('customer/shoppingcart', res);
  } else if (url === '/shop') {
    renderView('customer/shop', res);
  } else if (url === '/vieworders') {
    renderView('supplier/vieworders', res);
  } else if (url === '/additems') {
    renderView('supplier/additems', res);
  } else if (url === '/edititems') {
    renderView('supplier/edititems', res);
  } else if (url === '/supplierreport') {
    renderView('supplier/report', res);
  } else if (url === '/createmenu') {
    renderView('management/createmenu', res);
  } else if (url === '/purchaseorder') {
    renderView('management/purchaseorder', res);
  } else if (url === '/report') {
    renderView('management/report', res);
  } else if (url === '/viewupdatecategories') {
    renderView('management/viewupdatecategories', res);
  } else if (url === '/customerordermanagement') {
    renderView('management/customerordermanagement', res); 
  } else if (url === '/login') {
    renderView('login', res);
  }else if (url === '/register') {
    renderView('register', res);
  }else if (url === '/productsmanagement') { 
    renderView('management/productsmanagement', res);
  }else if (url === '/addsuppliers') {
    renderView('supplier/addsuppliers', res);
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

function renderView(viewName, res) {
  const viewPath = path.join(__dirname, 'views', `${viewName}.ejs`);
  fs.readFile(viewPath, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
