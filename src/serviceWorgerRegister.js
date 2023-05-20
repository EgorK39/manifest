import {Workbox} from "workbox-window";

export default function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('sw.js');
        wb.addEventListener('installed', event => {
            console.log('installed:', event);
            // первый запуск после регистрации воркера
            if (event.isUpdate) {
                console.log('event.isUpdate:', event);
                // обновление воркера

                if (confirm("New app")) {
                    // alert refresh
                    console.log('New app:', confirm());
                    window.location.reload();
                }
            }
        })
        wb.register();
    }
}
