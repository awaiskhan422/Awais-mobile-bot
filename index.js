const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const sock = makeWASocket({ auth: state })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message) return
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (text === '.ping') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Pong! Awais Bot is Alive ✅' })
        }
        if (text === '.menu') {
            await sock.sendMessage(msg.key.remoteJid, { text: '*Awais Mobile Bot Menu*\n\n.ping - Check bot\n.menu - This menu\n.owner - Owner info' })
        }
        if (text === '.owner') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Owner: Awais Khan 👑' })
        }
    })

    console.log("Bot Started!")
}

startBot()
