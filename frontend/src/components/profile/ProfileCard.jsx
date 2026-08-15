function ProfileCard({ label, value }) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 border">

            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="text-lg font-semibold text-slate-800 mt-1">
                {value}
            </p>

        </div>
    );
}

export default ProfileCard;