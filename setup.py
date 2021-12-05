import setuptools

with open("README.md", "r") as f:
    long_description = f.read()

setuptools.setup(
    author="Carlos A Molina",
    classifiers=[
        "Programming Language :: Python :: 3.9",
        "License :: OSI Approved :: MIT License",
        "Operating System : Gnu/Linux: Debian",
    ],
    description="Python's logs parser",
    include_package_data=True,
    install_requires=[
        "pandas",
        "requests>=2.26.0",
    ],
    long_description_content_type="text/markdown",
    long_description=long_description,
    name="logs_parser",
    packages=setuptools.find_packages(),
    project_urls={
        "Source": "https://github.com/CarlosAMolina/logs-parser",
    },
    python_requires=">=3.9",
    version="0.0.1",
)
