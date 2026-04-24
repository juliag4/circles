export const AddStyle = (css) => {
    console.log('1');
    const style = document.createElement('style');
    console.log('2');
    style.textContent = css;
    console.log('3');
    document.head.appendChild(style);
    console.log('4');
};
