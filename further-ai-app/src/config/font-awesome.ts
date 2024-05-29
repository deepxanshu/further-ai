import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment, faStar } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPlus, faArrowTurnDown, faEllipsis, faWandMagicSparkles, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faArrowUpFromBracket, faPlus, faArrowTurnDown, faComment, faEllipsis, faStar, faWandMagicSparkles, faUser);
// library.reset();

export { FontAwesomeIcon};