import { useForm } from "react-hook-form";

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)

        // img upload
        const formData = new FormData();
        formData.append('image', data.image[0]);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_SECRET_KEY}`;
        console.log(url)
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if(imgResponse.status){
                    const imgUrl = imgResponse.data.display_url;
                    console.log(imgUrl)

                }
          })
    };


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className="md:w-11/12 mx-auto bg-slate-100 my-7 p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Racipe Name*</span>
                    </label>
                    <label>
                        <input className="my-input" placeholder="Racipe Name" {...register("name")} required />
                    </label>
                </div>
                <div className="flex gap-5 mt-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <label>
                            <select {...register("category")} className="my-input" required>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <label>
                            <input className="my-input" placeholder="Price" {...register("price")} required />
                        </label>
                    </div>
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">Racipe Details*</span>
                    </label>
                    <label>
                        <textarea name="" id="" className=" my-input" placeholder="Racipe Details" {...register("recipe")} required></textarea>
                    </label>
                </div>
                <input type="file" className="file-input w-full max-w-xs mt-4" {...register("image")} required />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" className="my-btn block mt-5 cursor-pointer" value={'Add Item'} />
            </form>
        </div>
    );
}