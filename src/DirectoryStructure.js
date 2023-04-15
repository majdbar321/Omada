const DirectoryStructure = ({ messages }) => {
    return (
        <div className="message-container">
            <pre>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </pre>
        </div>
    );
};
export default DirectoryStructure;
