/**
 * ACAR Default Package
 * @param  {Client} client  
 * @param  {object} ozellik 
 * @return {[type]}
 * ACAR Default Package
 */

module.exports = async function (client, ozellik) {
    const konsolBilgi  = (ozellik.konsolBilgi)
    const küfürEngel = (ozellik.küfürEngel)
    const reklamEngel = (ozellik.reklamEngel)
    const izinliRoller = (ozellik && ozellik.izinliRoller) || [];
    const izinliKanallar = (ozellik && ozellik.izinliKanallar) || [];
    const küfürler =  ["amcık","orospu","piç","sikerim","sikik","amına","pezevenk","yavşak","ananı","anandır","orospu","evladı","göt","pipi","sokuk","yarrak","oç","o ç","siktir","bacını","karını","amk","aq","sik","amq","anaskm","AMK","YARRAK","sıkerım"];
    const reklamlar = ["http://","https://","cdn.discordapp.com","discordapp.com","discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf"]
    const uyarıMesajı = (ozellik.uyarıMesajı)
    const kufurUyariMesaj = (ozellik && ozellik.kufurUyariMesaj) ||`Birdaha küfür etmemelisin aksi taktirde ceza alacaksın.`;
    const reklamUyariMesaj = (ozellik && ozellik.reklamUyariMesaj) ||`Birdaha reklam yapmamalısın aksi taktirde ceza alacaksın.`;

    // Konsol Bilgisi Başlangıcı
if(konsolBilgi) {
    console.log(``)
    console.log('\x1b[36m',`[~ ACAR Küfür & Reklam Engel Sistemi ~]`)
    if(küfürEngel)  {console.log('\x1b[32m','[~ ACAR Küfür Engeli (AÇIK) ~]')} else {console.log('\x1b[31m','[~ ACAR Küfür Engeli (KAPALI) ~]')};
    if(reklamEngel) {console.log('\x1b[32m','[~ ACAR Reklam Engeli (AÇIK) ~]')} else {console.log('\x1b[31m','[~ ACAR Reklam Engeli (KAPALI) ~]')};
    if(uyarıMesajı) {
    console.log('\x1b[32m','[~ ACAR Reklam & Küfür Uyarı Mesajı (AÇIK) ~]')
    if(küfürEngel) console.log('\x1b[33m%s\x1b[37m%s\x1b[33m%s\x1b[0m',' [~ Küfür Uyarı Mesajı ~] ', `${kufurUyariMesaj}`, ' olarak belirlendi.')
    if(reklamEngel) console.log('\x1b[33m%s\x1b[37m%s\x1b[33m%s\x1b[0m',' [~ Reklam Uyarı Mesajı ~] ', `${reklamUyariMesaj}`, ' olarak belirlendi.')
    } else {console.log('\x1b[31m%s\x1b[0m',' [~ ACAR Reklam & Küfür Uyarı Mesajı (KAPALI) ~]')};
    console.log('\x1b[0m',``)
};

    // Küfür Engel Başlangıcı
    client.on('message', async message => {
        if (!küfürEngel) return 
        if(message.webhookID || message.author.bot|| message.channel.type == "dm") return;
        if(message.member.hasPermission('ADMINISTRATOR') && message.member.hasPermission('BAN_MEMBERS')) return;
        if(izinliKanallar.some(oku => message.channel.id == oku)) return;
        if(izinliRoller.some(oku => message.member.roles.cache.has(oku))) return;
        if(küfürler.some(word => message.content.toLowerCase().includes(word))) {
        if(uyarıMesajı) { uyar(message, kufurUyariMesaj) } else { message.delete() };
        }
    });
    client.on("messageUpdate", async (oldMessage, newMessage) => {
        if(!küfürEngel) return
        if(newMessage.webhookID || newMessage.author.bot || newMessage.channel.type == "dm") return;
        if(newMessage.member.hasPermission('ADMINISTRATOR') && newMessage.member.hasPermission('BAN_MEMBERS')) return;
        if(izinliKanallar.some(oku => newMessage.channel.id == oku)) return;
        if(izinliRoller.some(oku => newMessage.member.roles.cache.has(oku))) return;
        if(küfürler .some(word => newMessage.content.toLowerCase().includes(word))) {
        if(uyarıMesajı) { uyar(newMessage, kufurUyariMesaj) } else { message.delete() };
        }
    });

    // Reklam Engel Başlangıcı
    client.on('message', async message => {
        if(!reklamEngel) return 
        if(message.webhookID || message.author.bot|| message.channel.type == "dm") return;
        if(message.member.hasPermission('ADMINISTRATOR') && message.member.hasPermission('BAN_MEMBERS')) return;
        if(izinliRoller.some(oku => message.member.roles.cache.has(oku))) return;
        if(reklamlar.some(word => message.content.toLowerCase().includes(word))) {
        if(uyarıMesajı) { uyar(message, reklamUyariMesaj) } else { message.delete() };
        }
    });
    client.on("messageUpdate", async (oldMessage, newMessage) => {
        if(!reklamEngel) return
        if(newMessage.webhookID || newMessage.author.bot || newMessage.channel.type == "dm") return;
        if(newMessage.member.hasPermission('ADMINISTRATOR') && newMessage.member.hasPermission('BAN_MEMBERS')) return;
        if(izinliRoller.some(oku => newMessage.member.roles.cache.has(oku))) return;
        if(reklamlar.some(word => newMessage.content.toLowerCase().includes(word))) {
        if(uyarıMesajı) { uyar(newMessage, reklamUyariMesaj) } else { message.delete() };
        }
    });


    /**
    * Uyarı Mesajı Fonksiyonu
    * @param  {Object} mesaj
    * @param  {string} uyarımesajı
    * @param  {string} tür
    */
    function uyar(mesajeventi, uyarımesajı) {
        mesajeventi.delete()
        mesajeventi.channel.send(`${mesajeventi.author}, ${uyarımesajı}`).then(x => x.delete({timeout: 7500}))
    }
}
