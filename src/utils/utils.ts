
export function startScreenLoader() {
    const main = document.querySelector("main") as HTMLDivElement;
    main.style.display = "flex";
}
export function stopScreenLoader() {
    const loader = document.getElementById('screen-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 500);
    }
}