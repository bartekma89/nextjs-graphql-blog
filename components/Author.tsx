interface ComponentProps {
  author: any;
}

export default function Author({ author }: ComponentProps) {
  return (
    <div className="text-center mt-20 mb-8 p-12 rounded-lg bg-black bg-opacity-20 relative">
      <h3 className="text-white mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
}
