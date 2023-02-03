import Image from "next/image";

export default function ImagesList({list}: any) {
    return (
        <main className="p-4 flex flex-col gap-4 rounded-2xl shadow-xl shadow-black/30">
            {list.map((item: any) => (
                <div key={item._id}>
                    <Image src={item.url} alt="image" width="200" height="200" className="object-contain" />
                    <h3>{item.title}</h3>
                </div>
            ))}
        </main>
    )
}