"use client";

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      {error.message}
      <p>error</p>
      <button onClick={() => reset()}>再レンダリング</button>
    </div>
  );
};

export default GlobalError;
