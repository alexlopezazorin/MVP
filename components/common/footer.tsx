import Link from "next/link"

export default function Footer() {
    return(
    <footer className="border-t bg-muted/20 py-12">
        <div className="">
            <Link href="/legal/privacy_policy"> Privacy Policy </Link>
            <Link href="/legal/terms_and_conditions"> Terms and Conditions </Link>
            <Link href="/legal/legal_notice"> Legal Notice </Link>
        </div>
    </footer>
    );
  }