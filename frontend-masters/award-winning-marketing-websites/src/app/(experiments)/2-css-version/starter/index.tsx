import styles from "./style.module.css";

const text = [
	"CSS".split("").map((letter) => ({ letter, id: crypto.randomUUID() })),
	"version".split("").map((letter) => ({ letter, id: crypto.randomUUID() })),
];

export default function Page() {
	return (
		<div className="bg-blue-300 text-black">
			<div className="flex h-screen items-end justify-left overflow-hidden">
				<h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
					{text[0].map((item, index) => (
						<span
							className={styles.letter}
							key={item.id}
							style={
								{
									"--index": index,
								} as React.CSSProperties
							}
						>
							{item.letter}
						</span>
					))}
					<br />
					{text[1].map((item, index) => (
						<span
							className={styles.letter}
							key={item.id}
							style={
								{
									"--index": index + 3,
								} as React.CSSProperties
							}
						>
							{item.letter}
						</span>
					))}
				</h1>
			</div>
		</div>
	);
}
