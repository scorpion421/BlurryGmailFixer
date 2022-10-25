const regex = /^(https:)?\/\/.+?.gstatic.com\/ui\/v1\/icons\/.+?\/.+?\/1x\//;
const regex2 = /^(https:)?\/\/.+?.gstatic.com\/.+?_1x.png$/;

browser.webRequest.onBeforeRequest.addListener(
    requestDetails => {
        if (requestDetails.originUrl.startsWith('https://mail.google.com')) {
            if (regex.test(requestDetails.url)) {
                return {
                    redirectUrl: requestDetails.url.replace('/1x/', '/2x/')
                };
            }
            
            if (regex2.test(requestDetails.url)) {
                return {
                    redirectUrl: requestDetails.url.replace('1x.png', '2x.png')
                };
            }
        }
    },
    { urls: ['https://*.gstatic.com/*'], types: ['image'] },
    ['blocking']
);
