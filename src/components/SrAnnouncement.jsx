const SrAnnouncement = ({ announcement }) => {
  return (
    <div className="sr-only" aria-live="assertive" aria-atomic="true">
      {announcement}
    </div>
  );
};
export default SrAnnouncement;
