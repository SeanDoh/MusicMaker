# MusicMaker
A Twitch video overlay extension allowing for viewers to interactively create music with a Twitch.tv streamer.

At a high level, a viewer loads Twitch channel, grants access to the extension, creates a drumloop and/or melody, hits an upload button, and the music starting playing live on the streamers computer that is running Ableton.

Frontend connects to the backend via websockets, and the streamers session of Ableton connects to the backend via a websocket.
The streamer can control certain musical parameters of the sequencer, such as BPM, key signature and mode, (time signatures to come).

This repo will house the frontend, backend, and Max4Live code.
I am currently refactoring the extension from a prior single channel release.
Please see these repos for the earlier version:
* https://github.com/SeanDoh/MusicMaker-Frontend
* https://github.com/SeanDoh/MusicMaker-Backend
* https://github.com/SeanDoh/MusicMaker-Max4Live
