export default function AskQuestion({text}: {text: string}) {
    return (
        <div
            style={{
                alignItems: 'center',
                background: 'black',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    color: 'white',
                    fontSize: 60,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 30,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {text}
            </div>
        </div>
    )
}