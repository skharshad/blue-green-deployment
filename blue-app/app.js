cat <<EOF > blue-app/app.js
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello from the BLUE environment!');
});
app.listen(port, () => {
  console.log(\`Blue app listening on port \${port}\`);
});
EOF
