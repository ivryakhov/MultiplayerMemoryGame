export default {
    card: {
        width: '15%',
        userSelect: 'none',
        height: '110px',
        padding: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
        marginBottom: '15px',
        transition: '0.6s',
        transformStyle: 'preserve-3d',
        position: 'relative'
    },
    div: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        transition: '0.6s'
         
    },
    front: {
        fontSize: '50px',
        lineHeight: '140px',
        cursor: 'pointer',
        color: 'darken(#f4f5f7, 20 %)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        fontSize: '50px',
        transform: 'rotateY(180deg)',
        lineHeight: '110px'
    },
    img: {
        verticalAlign: 'middle',
        width: '70%'
    },
    opened: {
        transform: 'rotateY(180deg)'
    },
    matched: {
        transform: 'rotateY(180deg)',
        pointerEvents: 'none'
    },
    mback: {
        boxShadow: '0 0 0 2px rgba(#000, .05) inset',
        animation: 'selected .8s 0s ease 1',
        animationFillMode: 'both',
        opacity: '.2'
    },
    disabled: {
        pointerEvents: 'none'
    }
};