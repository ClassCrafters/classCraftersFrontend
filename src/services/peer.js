class PeerService {
    constructor() {
        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        });

        this.tracksAdded = false;
    }

    addTracks(stream) {
        if (this.tracksAdded) {
            console.warn("Tracks already added, skipping");
            return;
        }

        stream.getTracks().forEach(track => {
            this.peer.addTrack(track, stream);
        });

        this.tracksAdded = true;
    }

    async getOffer() {
        if (!this.peer) return;

        if (this.peer.signalingState !== "stable") {
            console.warn("Peer not stable, cannot create offer");
            return;
        }

        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(offer);
        return offer;
    }

    async getAnswer(offer) {
        if (!this.peer) return;

        await this.peer.setRemoteDescription(offer);

        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(answer);
        return answer;
    }

    async setRemoteDescription(answer) {
        if (!this.peer) return;

        await this.peer.setRemoteDescription(answer);
    }

    reset() {
        if (this.peer) {
            this.peer.close();
        }

        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ],
                },
            ],
        });

        this.tracksAdded = false;
    }
}

export default new PeerService();
