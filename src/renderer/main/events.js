const Events = {
    InitEvents() {
        const app = window.app

// add event listener for when window.location.hash changes
        window.addEventListener("hashchange", function () {
            app.appRoute(window.location.hash)
        });

        window.addEventListener("mouseup", (e) => {
            if (e.button === 3) {
                e.preventDefault()
                app.navigateBack()
            } else if (e.button === 4) {
                e.preventDefault()
                app.navigateForward()
            }
        });

        document.addEventListener('keydown', async function (event) {
            // CTRL + F
            if (event.keyCode === 70 && event.ctrlKey) {
                app.appRoute('search')
                app.$refs.searchInput.focus()
                app.$refs.searchInput.select()
            }
            // CTRL + R
            if (event.keyCode === 82 && event.ctrlKey) {
                event.preventDefault()
                bootbox.confirm("Reload Cider?", (res)=>{
                    if(res) {
                        window.location.reload()
                    }
                })
            }
            // CTRL + SHIFT + R
            if (event.keyCode === 82 && event.ctrlKey && event.shiftKey) {
                event.preventDefault()
                window.location.reload()
            }
            // CTRL + S
            if (event.keyCode === 83 && event.ctrlKey) {
                app.appRoute("settings")
            }
            // CTRL + A
            if (event.keyCode === 65 && event.ctrlKey) {    
                app.appRoute("library-albums")
            }
            // CTRL + B
            if (event.keyCode === 66 && event.ctrlKey) {
                app.appRoute("browse")
            }
            // CTRL + D
            if (event.keyCode === 68 && event.ctrlKey) {
                app.appRoute("library-artists")
            }            
            // CTRL + E
            if (event.keyCode === 69 && event.ctrlKey) {
                app.invokeDrawer('queue')
            }
            // CTRL+H
            if (event.keyCode === 72 && event.ctrlKey) {
                app.appRoute("home")
            }
            // CTRL+SHIFT+H
            if (event.ctrlKey && event.shiftKey && event.keyCode == 72) {
                let hist = await app.mk.api.v3.music(`/v1/me/recent/played/tracks`, {
                    l: app.mklang
                })
                app.showCollection(hist.data, app.getLz('term.history'))
            }
            if (event.ctrlKey && event.keyCode == 121) {
                try {
                    app.mk._services.mediaItemPlayback._currentPlayer.stop()
                } catch (e) {
                }
                try {
                    app.mk._services.mediaItemPlayback._currentPlayer.destroy()
                } catch (e) {
                }
            }
            if (event.ctrlKey && event.keyCode == 122) {
                try {
                    ipcRenderer.send('detachDT', '')
                } catch (e) {
                }
            }
            // Prevent Scrolling on spacebar
            if (event.keyCode === 32 && event.target === document.body) {
                event.preventDefault()
                app.SpacePause()  
                
            }
        });

        // Hang Timer
        app.hangtimer = setTimeout(() => {
            if (confirm("Cider is not responding. Reload the app?")) {
                window.location.reload()
            }
        }, 10000)

// Refresh Focus
        function refreshFocus() {
            if (document.hasFocus() == false) {
                app.windowFocus(false)
            } else {
                app.windowFocus(true)
            }
            setTimeout(refreshFocus, 200);
        }

        app.getHTMLStyle()

        refreshFocus();
    }
}

export {Events}