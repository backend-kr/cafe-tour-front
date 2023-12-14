const SignUp = () => {
  return (
    <div className="bg-main w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[400px] bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] box-border px-14 py-10 rounded-lg">
        <h1 className="text-2xl text-center font-semibold text-main">
          회원가입
        </h1>
        <input
          type="text"
          className="w-full border border-neutral-400 rounded-full mt-8 px-4 py-[10px] outline-none box-border text-sm placeholder:text-neutral-400"
          placeholder="아이디를 입력해주세요."
        />
        <input
          type="password"
          className="w-full border border-neutral-400 rounded-full mt-3 px-4 py-[10px] outline-none box-border text-sm placeholder:text-neutral-400"
          placeholder="비밀번호를 입력해주세요."
        />
        <input
          type="password"
          className="w-full border border-neutral-400 rounded-full mt-3 px-4 py-[10px] outline-none box-border text-sm placeholder:text-neutral-400"
          placeholder="비밀번호를 한번 더 입력해주세요."
        />
        <button className="w-full mt-6 bg-main rounded-full py-[10px] text-white font-semibold">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUp;
