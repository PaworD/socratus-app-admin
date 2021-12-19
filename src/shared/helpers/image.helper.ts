export const imageFromText = (text: string): string => {

    const $el: HTMLCanvasElement = document.createElement('canvas')
    const $context: CanvasRenderingContext2D = $el.getContext('2d')!

    let letter

    if (text.includes(" ")) {
        letter = text.split(' ')[0][0] + text.split(' ')[1][0]
    } else {
        letter = text[0]
    }

    //Fill canvas with random color
    $context.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 23%,60%)`
    $context.fillRect(0, 0, $el.width, $el.height);

    // Draw letter inside Canvas
    $context.font = "40px Arial"
    $context.fillStyle = "white"
    $context.textAlign = "center"
    $context.fillText(letter,
        $el.width / 2,
        $el.height / 2
        );

    return $el.toDataURL()
}