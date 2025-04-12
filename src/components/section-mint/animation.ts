const cardVariants = {
  top: {
    rotate: -45,
    top: 120,
    marginRight: 0,
    zIndex: 15,
  },
  middle: {
    rotate: -30,
    top: 215,
    marginRight: 20,
    zIndex: 10,
  },
  bottom: {
    rotate: -15,
    top: 320,
    marginRight: 80,
    zIndex: 5,
  },
};
const mobileCardVariants = {
  top: {
    rotate: -45,
    top: -100 + 5,
    marginRight: 0,
    zIndex: 15,
    left: -10 - 20,
  },
  middle: {
    rotate: -30,
    top: -70 + 5,
    marginRight: 20,
    zIndex: 10,
    left: -10 - 20,
  },
  bottom: {
    rotate: -15,
    top: -40 + 5,
    marginRight: 200,
    zIndex: 5,
    left: -17 - 20,
  },
};

const headerVariants = {
  offscreen: {
    top: {
      ...cardVariants.top,
      top: 120 - 1000,
    },
    middle: {
      ...cardVariants.middle,
      top: 215 - 1000,
    },
    bottom: {
      ...cardVariants.bottom,
      top: 320 - 1000,
    },
  },
  onscreen: {
    top: cardVariants.top,
    middle: cardVariants.middle,
    bottom: cardVariants.bottom,
  },
  afterscreen: {
    top: {
      ...cardVariants.top,
      top: 120 + 2000,
    },
    middle: {
      ...cardVariants.middle,
      top: 215 + 2000,
    },
    bottom: {
      ...cardVariants.bottom,
      top: 320 + 2000,
    },
  },
};
const transition = { duration: 1, type: "spring", bounce: 0.2 };
const transitionUp = { duration: 0.3, type: "spring", bounce: 0.2 };

const topRaisedVariant = {
  rotate: -65,
  top: -100,
  marginRight: -20,
  zIndex: cardVariants.top.zIndex,
  transition: transitionUp,
};
const topRaisedVariantMobile = {
  rotate: -65,
  top: -100 - 30,
  marginRight: 20,
  zIndex: cardVariants.top.zIndex,
  transition: transitionUp,
  left: -10 - 20,
};

const containerStyle = {
  position: "absolute",
  borderRadius: "25px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 0.20)",
};

export {
  cardVariants,
  headerVariants,
  transition,
  transitionUp,
  topRaisedVariant,
  containerStyle,
  mobileCardVariants,
  topRaisedVariantMobile,
};
