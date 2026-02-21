import { FooterBtn } from "../main/body-btns";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center text-secondary -space-y-1 mb-3 sm:mb-2">
      <p className="text-[13px] tracking-wide">
        Design & Developed by{" "}
        <b>
          <FooterBtn />
        </b>
      </p>
      <p className="text-[13px] tracking-wide">© 2026. All rights reserved.</p>
    </div>
  );
}
