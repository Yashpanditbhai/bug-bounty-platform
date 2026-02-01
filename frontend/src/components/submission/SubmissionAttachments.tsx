export const SubmissionAttachments = ({ files }: { files: any[] }) => {
  if (!files?.length) return null;

  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {files.map((file) => {
        if (file.type === "image") {
          return <img key={file.url} src={file.url} alt={file.name} className="rounded-lg border object-cover" />;
        }

        if (file.type === "video") {
          return (
            <video key={file.url} controls className="rounded-lg border">
              <source src={file.url} />
            </video>
          );
        }

        return (
          <a
            key={file.url}
            href={file.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 underline"
          >
            📎 {file.name}
          </a>
        );
      })}
    </div>
  );
};
