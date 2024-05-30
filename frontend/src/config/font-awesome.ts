import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment, faStar, faThumbsUp, faThumbsDown, faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPlus, faArrowTurnDown, faEllipsis, faWandMagicSparkles, faUser, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faArrowUpFromBracket, faPlus, faArrowTurnDown, faComment, faEllipsis, faStar, faWandMagicSparkles, faUser, faHandSparkles, faThumbsUp, faThumbsDown, faClipboard);
// library.reset();

export { FontAwesomeIcon};