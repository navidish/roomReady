const IconComponent = ({ icon }) => {
  return <div dangerouslySetInnerHTML={{ __html: icon }} />;
};

export default IconComponent;
