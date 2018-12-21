module.exports = function(req, res, next) {
    if(req.session.admin) {
        req.session.admin = {session_id: '', admin_id: '', admin_email: ''}
    }
    next()
}