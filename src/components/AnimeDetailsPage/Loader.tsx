interface LoaderProps {
    size?: number;
    color?: string;
    dotSize?: number;
}

function Loader({
                    size = 50,
                    color = 'var(--color-secondary-base-standard)',
                    dotSize = 8
                }: LoaderProps) {
    return (
        <div
            className="rounded-full animate-spin"
            style={{
                width: `${size}px`,
                aspectRatio: '1',
                background: `
          radial-gradient(farthest-side, ${color} 94%, #0000) top/${dotSize}px ${dotSize}px no-repeat,
          conic-gradient(#0000 30%, ${color})
        `,
                WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - ${dotSize}px), #000 0)`,
                mask: `radial-gradient(farthest-side, #0000 calc(100% - ${dotSize}px), #000 0)`
            }}
        />
    );
};

export default Loader;