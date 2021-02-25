console.log('This is comming from a script tag');

const header = $('#shopify-section-header');

header.prepend('<div>Hello!! This text is coming a script tag!!</div>')
.css({'background': 'red', 'text-align': 'center', 'padding': '10px 0'});

