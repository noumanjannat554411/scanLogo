const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/NativeARViewer.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the relay HTML section with direct file opening
const oldCode = `                                // Create a relay HTML file that will trigger AR Quick Look
                                const relayHTML = \`
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AR Quick Look</title>
</head>
<body>
    <a id="arLink" rel="ar" href="file://\${downloadPath}">
        <img src="" />
    </a>
    <script>
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('arLink').click();
            }, 100);
        });
    </script>
</body>
</html>\`;

                                const relayPath = \`\${RNFS.DocumentDirectoryPath}/ar_relay.html\`;
                                await RNFS.writeFile(relayPath, relayHTML, 'utf8');

                                const relayUrl = \`file://\${relayPath}\`;
                                console.log('🚀 Opening relay HTML:', relayUrl);

                                // Try to open via relay HTML
                                const canOpen = await Linking.canOpenURL(relayUrl);
                                console.log('✅ Can open relay URL:', canOpen);

                                if (canOpen) {
                                    await Linking.openURL(relayUrl);
                                    console.log('✅ AR Quick Look triggered via relay');
                                } else {
                                    // Fallback: Try direct file URL
                                    const directUrl = \`file://\${downloadPath}\`;
                                    console.log('🔄 Trying direct file URL:', directUrl);
                                    await Linking.openURL(directUrl);
                                }`;

const newCode = `                                // Open the GLB file directly
                                const fileUrl = \`file://\${downloadPath}\`;
                                console.log('🚀 Opening AR with downloaded file:', fileUrl);

                                try {
                                    await Linking.openURL(fileUrl);
                                    console.log('✅ AR Quick Look opened successfully');
                                } catch (linkError) {
                                    console.error('❌ Error opening file URL:', linkError);
                                    throw new Error('Failed to open AR Quick Look');
                                }`;

content = content.replace(oldCode, newCode);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ File fixed successfully!');
