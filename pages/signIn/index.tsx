import Link from "next/link";

const SignIn = () => {
  return (
    <div className="bg-main w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[400px] bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] box-border px-14 py-10 rounded-lg">
        <h1 className="text-2xl text-center font-semibold text-main">로그인</h1>
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
        <button className="w-full mt-6 bg-main rounded-full py-[10px] text-white font-semibold">
          로그인
        </button>
        <p className="text-center font-bold text-xs mt-12">
          계정이 없으시다면?
        </p>
        <Link
          href="/signUp"
          className="text-center block font-bold text-xs text-main mt-3"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
