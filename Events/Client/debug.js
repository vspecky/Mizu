module.exports = async (Mizu, info) => {
    if(info.includes('Sending a heartbeat') || info.includes('Heartbeat acknowledged')) return;
    console.warn('DEBUG INFO:');
    console.warn(info);
}