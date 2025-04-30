export default function userProfile({params}: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
        <h1>Profile</h1>
        <hr />
        <p className="text-4xl">Profile page 
            <span className="bg-orange-400 ml-4 px-3 rounded text-black">{params.id}</span>
        </p>
      </div>
    );
  }