const SHUTDOWN_TEXT =
  "MPKBot sulkeutuu pysyvästi MPK:n verkkopalvelu-uudistuksen myötä 15.6.2026.";
const READ_MORE_URL =
  "https://mpk.fi/ajankohtaista/mpkn-uudet-verkkosivut-ja-koulutuskalenteri-avautuvat-kesalla/";

const ShutdownRibbon = () => {
  return (
    <div className="shutdown-ribbon" role="alert">
      <span className="shutdown-ribbon__text">
        {SHUTDOWN_TEXT}{" "}
        <a
          className="shutdown-ribbon__link"
          href={READ_MORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lue lisää
        </a>
      </span>
    </div>
  );
};

export default ShutdownRibbon;
