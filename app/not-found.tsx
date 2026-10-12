import Link from "next/link";
import { Container } from "~/components/Container";
import { locale } from "~/lib/i18n/lang";

const NotFound = () => (
  <Container title="404">
    <div className="py-24 text-center">
      <p className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">404</p>
      <Link
        href="/"
        className="inline-block mt-6 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
      >
        ← {locale.POST.HOME}
      </Link>
    </div>
  </Container>
);

export default NotFound;
